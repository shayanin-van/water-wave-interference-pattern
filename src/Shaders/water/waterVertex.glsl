uniform float uTime;

varying float displacement;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    #define PI 3.14159265358979323846

    float A1 = 0.06;
    float f1 = 1.0;
    float omega1 = 2.0 * PI * f1;
    float lambda1 = 1.0;
    float k1 = 2.0 * PI / lambda1;
    float oX1 = 2.0; // wave 1 origin's x coordinate
    float oZ1 = -4.0; // wave 1 origin's z coordinate
    float dX1 = modelPosition.x - oX1;
    float dZ1 = modelPosition.z - oZ1;
    float d1 = sqrt(dX1 * dX1 + dZ1 * dZ1);
    float displacement1 = A1 * sin(k1 * d1 - omega1 * uTime);

    float A2 = 0.06;
    float f2 = 1.0;
    float omega2 = 2.0 * PI * f2;
    float lambda2 = 1.0;
    float k2 = 2.0 * PI / lambda2;
    float oX2 = -2.0; // wave 1 origin's x coordinate
    float oZ2 = -4.0; // wave 1 origin's z coordinate
    float dX2 = modelPosition.x - oX2;
    float dZ2 = modelPosition.z - oZ2;
    float d2 = sqrt(dX2 * dX2 + dZ2 * dZ2);
    float displacement2 = A2 * sin(k2 * d2 - omega2 * uTime);

    float totalDisplacement = displacement1 + displacement2;

    modelPosition.y += totalDisplacement;

    // varying
    displacement = totalDisplacement;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}