uniform float uTime;
uniform bool uSwitch1IsON;
uniform bool uSwitch2IsON;
uniform float uTimeAtLastClick1;
uniform float uTimeAtLastClick2;

varying float displacement;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    #define PI 3.14159265358979323846

    float A1 = 0.08;
    float f1 = 2.0;
    float omega1 = 2.0 * PI * f1;
    float lambda1 = 0.8;
    float k1 = 2.0 * PI / lambda1;
    float oX1 = 2.0; // wave 1 origin's x coordinate
    float oZ1 = -4.0; // wave 1 origin's z coordinate
    float dX1 = modelPosition.x - oX1;
    float dZ1 = modelPosition.z - oZ1;
    float d1 = sqrt(dX1 * dX1 + dZ1 * dZ1);
    float timeFromLastClick1 = uTime - uTimeAtLastClick1;
    float distanceFromLastClick1 = f1 * lambda1 * timeFromLastClick1;
    float displacement1;
    if (uSwitch1IsON) {
        if (distanceFromLastClick1 > d1) {
            displacement1 = A1 * sin(k1 * d1 - omega1 * uTime);
        } else {
            displacement1 = 0.0;
        }
    } else {
        if (distanceFromLastClick1 > d1) {
            displacement1 = 0.0;
        } else {
            displacement1 = A1 * sin(k1 * d1 - omega1 * uTime);
        }
    }

    float A2 = 0.08;
    float f2 = 2.0;
    float omega2 = 2.0 * PI * f2;
    float lambda2 = 0.8;
    float k2 = 2.0 * PI / lambda2;
    float oX2 = -2.0; // wave 2 origin's x coordinate
    float oZ2 = -4.0; // wave 2 origin's z coordinate
    float dX2 = modelPosition.x - oX2;
    float dZ2 = modelPosition.z - oZ2;
    float d2 = sqrt(dX2 * dX2 + dZ2 * dZ2);
    float timeFromLastClick2 = uTime - uTimeAtLastClick2;
    float distanceFromLastClick2 = f2 * lambda2 * timeFromLastClick2;
    float displacement2;
    if (uSwitch2IsON) {
        if (distanceFromLastClick2 > d2) {
            displacement2 = A2 * sin(k2 * d2 - omega2 * uTime);
        } else {
            displacement2 = 0.0;
        }
    } else {
        if (distanceFromLastClick2 > d2) {
            displacement2 = 0.0;
        } else {
            displacement2 = A2 * sin(k2 * d2 - omega2 * uTime);
        }
    }

    float totalDisplacement = displacement1 + displacement2;

    modelPosition.y += totalDisplacement;

    // varying
    displacement = totalDisplacement;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}