varying float displacement;

void main()
{
    vec3 color = mix(vec3(0.0, 0.0, 0.12), vec3(0.0, 0.0, 0.9), displacement);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}