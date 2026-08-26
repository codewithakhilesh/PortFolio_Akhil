

const canvas = document.getElementById("spaceCanvas");

if (canvas) {

    // ==========================================
    // THREE.JS SCENE
    // ==========================================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setClearColor(0x03050a, 1);

    camera.position.z = 300;


    // ==========================================
    // CINEMATIC LIGHTING
    // ==========================================

    const ambientLight = new THREE.AmbientLight(
        0x9bbcff,
        0.35
    );

    scene.add(ambientLight);


    // Cyan ambient light
    const cyanLight = new THREE.PointLight(
        0x00e5ff,
        2,
        1000
    );

    cyanLight.position.set(
        250,
        150,
        300
    );

    scene.add(cyanLight);


    // Purple ambient light
    const purpleLight = new THREE.PointLight(
        0x7c4dff,
        2,
        1000
    );

    purpleLight.position.set(
        -250,
        -150,
        200
    );

    scene.add(purpleLight);


    // ==========================================
    // LARGE STAR FIELD
    // ==========================================

    const starGeo =
        new THREE.BufferGeometry();

    const starMat =
        new THREE.PointsMaterial({

            color: 0xbdefff,

            size: 0.65,

            transparent: true,

            opacity: 0.75,

            sizeAttenuation: true

        });


    const starPositions = [];

    const starCount = 3000;


    for (let i = 0; i < starCount; i++) {

        starPositions.push(
            (Math.random() - 0.5) * 3000
        );

        starPositions.push(
            (Math.random() - 0.5) * 3000
        );

        starPositions.push(
            (Math.random() - 0.5) * 3000
        );

    }


    starGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );


    const stars =
        new THREE.Points(
            starGeo,
            starMat
        );


    scene.add(stars);


    // ==========================================
    // SMALLER STAR FIELD
    // ==========================================

    const smallStarGeo =
        new THREE.BufferGeometry();

    const smallStarMat =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.30,

            transparent: true,

            opacity: 0.55,

            sizeAttenuation: true

        });


    const smallStarPositions = [];


    for (let i = 0; i < 2200; i++) {

        smallStarPositions.push(
            (Math.random() - 0.5) * 3500
        );

        smallStarPositions.push(
            (Math.random() - 0.5) * 3500
        );

        smallStarPositions.push(
            (Math.random() - 0.5) * 3500
        );

    }


    smallStarGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            smallStarPositions,
            3
        )
    );


    const smallStars =
        new THREE.Points(
            smallStarGeo,
            smallStarMat
        );


    scene.add(smallStars);


    // ==========================================
    // GSAP SCROLL ANIMATION
    // ==========================================

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        document
            .querySelectorAll(".section")
            .forEach((section, index) => {

                gsap.fromTo(

                    section,

                    {
                        y: 50,
                        opacity: 0
                    },

                    {
                        y: 0,
                        opacity: 1,

                        duration: 0.8,

                        delay: index * 0.1,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: section,

                            start: "top 80%",

                            toggleActions:
                                "play none none none"

                        }

                    }

                );

            });

    }


    // ==========================================
    // MOUSE PARALLAX
    // ==========================================

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;


            targetMouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;

        }
    );


    // ==========================================
    // ANIMATION
    // ==========================================

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        // Slow star movement
        stars.rotation.y +=
            0.00010;

        stars.rotation.x +=
            0.00002;


        smallStars.rotation.y -=
            0.00006;


        // Mouse movement
        mouseX +=
            (targetMouseX - mouseX) *
            0.025;


        mouseY +=
            (targetMouseY - mouseY) *
            0.025;


        scene.rotation.y =
            mouseX * 0.012;


        scene.rotation.x =
            mouseY * 0.006;


        // Moving cyan glow
        cyanLight.position.x =
            250 +
            Math.sin(elapsed * 0.20) * 100;

        cyanLight.position.y =
            150 +
            Math.cos(elapsed * 0.25) * 80;


        // Moving purple glow
        purpleLight.position.x =
            -250 +
            Math.cos(elapsed * 0.18) * 100;

        purpleLight.position.y =
            -150 +
            Math.sin(elapsed * 0.22) * 80;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    // ==========================================
    // RESIZE
    // ==========================================

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );


    // ==========================================
    // SCROLL DOWN
    // ==========================================

    const scrollDown =
        document.querySelector(
            ".scroll-down"
        );


    if (scrollDown) {

        scrollDown.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:
                        window.innerHeight,

                    behavior:
                        "smooth"

                });

            }
        );

    }

}


/* ==========================================
   CERTIFICATE MODAL
   ========================================== */

const modal =
    document.getElementById(
        "certificateModal"
    );

const modalImg =
    document.getElementById(
        "modalImage"
    );

const closeBtn =
    document.querySelector(
        ".close"
    );


document
    .querySelectorAll(
        ".certificate-image"
    )
    .forEach((img) => {

        img.addEventListener(
            "click",
            () => {

                if (!modal) return;

                modal.style.display =
                    "flex";

                if (modalImg) {

                    modalImg.src =
                        img.src;

                }

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


if (closeBtn) {

    closeBtn.addEventListener(
        "click",
        () => {

            modal.style.display =
                "none";

            document.body.style.overflow =
                "";

        }
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                modal.style.display =
                    "none";

                document.body.style.overflow =
                    "";

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            if (
                modal &&
                modal.style.display ===
                "flex"
            ) {

                modal.style.display =
                    "none";

                document.body.style.overflow =
                    "";

            }

        }

    }
);