console.clear();

const { gsap, imagesLoaded } = window;

let currentIndex = 0;

const transitionSlideEl = document.querySelector(".image__transition-slide");

const slideImages = document.querySelectorAll(".section__image img");

const buttonPrev = document.querySelector(".btn--prev");
const buttonNext = document.querySelector(".btn--next");

const sectionDatas = [
	{
		heading: "For all the things you want",
		subheading: "For all the things you have",
		description:
			"We work to make your business start effectively working for you. Meet the financial and marketing specialists.",
		slideBackground: "#feb969",
	},
	{
		heading: "All The things you have",
		subheading: "For all the things you have",
		description:
			"Lorem ipsum dolor sit amet, id partem mentitum interesset sed, brute vitae everti ne quo, ad laudem singulis signiferumque qui.",
		slideBackground: "#cccccc",
	},
	{
		heading: "All The things We will have",
		subheading: "For all the things you have",
		description:
			"Ex pro bonorum nusquam constituto. Diam integre argumentum ius cu. Habeo facer nam ei. No vix ullum suscipit. Eos animal molestie at.",
		slideBackground: "#353535",
	},
];

buttonPrev.addEventListener("click", () => {
	handleSlide("prev");
});
buttonNext.addEventListener("click", () => {
	handleSlide("next");
});

function initPage() {
	for (let i = 0; i < slideImages.length; i++) {
		let display = i === currentIndex ? "block" : "none";
		gsap.set(slideImages[i], {
			display,
		});
	}

	gsap.set(
		".header, .content__heading, .content__subheading, .hr__line, .content__description, .btn, .section__image",
		{
			opacity: 0,
		}
	);

	gsap.to(".loading__wrapper", {
		duration: 0.25,
		opacity: 0,
		pointerEvents: "none",
	});

	let tl = gsap.timeline();

	tl.fromTo(
		".header",
		{
			opacity: 0,
			translateY: "-8%",
		},
		{
			delay: 0.35,
			duration: 0.35,
			opacity: 1,
			translateY: "0%",
		}
	)
		.fromTo(
			".content__heading, .content__subheading",
			{
				opacity: 0,
				translateY: "50%",
			},
			{
				duration: 0.35,
				stagger: 0.15,
				opacity: 1,
				translateY: "0%",
			}
		)
		.fromTo(
			".content__bottom, .btn--go",
			{
				opacity: 1,
				clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
			},
			{
				duration: 0.35,
				stagger: -0.2,
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				ease: "Expo.inOut",
			},
			"-=0.35"
		)
		.fromTo(
			".hr__line",
			{
				opacity: 1,
				scaleX: 0,
				transformOrigin: "right",
			},
			{
				duration: 0.25,
				scaleX: 1,
				transformOrigin: "left",
			}
		)
		.fromTo(
			".content__description",
			{
				opacity: 0,
				translateY: "5%",
			},
			{
				duration: 0.35,
				opacity: 1,
				translateY: "0",
			}
		)
		.fromTo(
			".section__image, .btn--prev, .btn--next",
			{
				opacity: 1,
				clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
			},
			{
				duration: 0.35,
				stagger: 0.15,
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				ease: "Expo.inOut",
			},
			"-=0.5"
		)
		.fromTo(
			".section__image img",
			{
				scale: 1.4,
			},
			{
				duration: 0.75,
				scale: 1,
				ease: "Expo.inOut",
			},
			"-=0.6"
		);
}

function replaceData() {
	const contentHeadingEl = document.querySelector(".content__heading");
	const contentSubheadingEl = document.querySelector(".content__subheading");
	const contentDescriptionEl = document.querySelector(".content__description");

	const data = sectionDatas[currentIndex];

	contentHeadingEl.innerHTML = data.heading;
	contentSubheadingEl.innerHTML = data.subheading;
	contentDescriptionEl.innerHTML = data.description;
	slideImages[currentIndex].style.display = "block";
}

function handleSlide(direction) {
	let increment = direction === "next" ? 1 : direction === "prev" ? -1 : 0;

	let transformXOriginStart =
		direction === "next" ? "right center" : direction === "prev" ? "left center" : 0;
	let transformXOriginEnd =
		direction === "next" ? "left center" : direction === "prev" ? "right center" : 0;

	let transformYOriginStart =
		direction === "next" ? "top center" : direction === "prev" ? "bottom center" : 0;
	let transformYOriginEnd =
		direction === "next" ? "bottom center" : direction === "prev" ? "top center" : 0;

	gsap.set(slideImages[currentIndex], {
		delay: 1,
		display: "none",
	});

	currentIndex += increment;

	if (currentIndex > sectionDatas.length - 1) currentIndex = 0;
	else if (currentIndex < 0) currentIndex = sectionDatas.length - 1;

	gsap.set(transitionSlideEl, {
		backgroundColor: sectionDatas[currentIndex].slideBackground,
	});

	gsap.to([buttonPrev, buttonNext], {
		pointerEvents: "none",
		filter: "grayscale(1)",
	});

	let tl = gsap.timeline();

	tl.to(".content__heading, .content__subheading", {
		duration: 0.35,
		stagger: -0.15,
		translateY: "50%",
		opacity: 0,
	})
		.to(
			".content__description",
			{
				duration: 0.35,
				opacity: 0,
				translateY: "5%",
			},
			"-=0.3"
		)
		.to(
			".content__bottom .hr__line",
			{
				duration: 0.25,
				transformOrigin: transformXOriginStart,
				scaleX: 0,
			},
			"-=0.3"
		)
		.fromTo(
			transitionSlideEl,
			{
				transformOrigin: transformYOriginStart,
				scaleY: 0,
			},
			{
				duration: 0.35,
				scaleY: 1,
			},
			"-="
		)
		.call(replaceData)
		.to(".content__heading, .content__subheading", {
			delay: 0.15,
			duration: 0.35,
			stagger: 0.15,
			translateY: "0%",
			opacity: 1,
		})
		.to(transitionSlideEl, {
			duration: 0.35,
			transformOrigin: transformYOriginEnd,
			scaleY: 0,
		})
		.to(
			".content__description",
			{
				duration: 0.35,
				opacity: 1,
				translateY: "0%",
			},
			"-=0.5"
		)
		.to(
			".content__bottom .hr__line",
			{
				duration: 0.25,
				transformOrigin: transformXOriginEnd,
				scaleX: 1,
			},
			"-=0.5"
		)

		.to([buttonPrev, buttonNext], {
			pointerEvents: "all",
			filter: "grayscale(0)",
		});
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
				});
				if (totalImages == loadedImages) {
					setTimeout(() => {
						initPage();
					}, 1800);
				}
			}
		});
	});
};

waitForImages();
