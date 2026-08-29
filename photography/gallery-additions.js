// Latest Creator gallery additions from Flickr embed sources.
// Only the direct image URLs and filenames are used; Flickr embed scripts are intentionally omitted.

const latestPhotos = [
    {
        src: "https://live.staticflickr.com/65535/55495191254_1c1f1db4fa_b.jpg",
        alt: "Landscape photograph DSCF5731",
        filename: "DSCF5731",
    },
    {
        src: "https://live.staticflickr.com/65535/55495190944_b5dd7214de_b.jpg",
        alt: "Landscape photograph DSCF5788",
        filename: "DSCF5788",
    },
    {
        src: "https://live.staticflickr.com/65535/55494037777_da655f7c5b_b.jpg",
        alt: "Portrait-oriented photograph DSCF3369",
        filename: "DSCF3369",
    },
    {
        src: "https://live.staticflickr.com/65535/55495408135_62d5f3a6c7_b.jpg",
        alt: "Landscape photograph DSCF3318",
        filename: "DSCF3318",
    },
    {
        src: "https://live.staticflickr.com/65535/55495407480_0a369cb2ee_b.jpg",
        alt: "Landscape photograph DSCF0679",
        filename: "DSCF0679",
    },
    {
        src: "https://live.staticflickr.com/65535/55495126778_200d85f0b1_b.jpg",
        alt: "Landscape photograph DSCF0768",
        filename: "DSCF0768",
    },
    {
        src: "https://live.staticflickr.com/65535/55495187199_5527b08580_b.jpg",
        alt: "Landscape photograph DSCF7148",
        filename: "DSCF7148",
    },
    {
        src: "https://live.staticflickr.com/65535/55495126293_a7f3319ed1_b.jpg",
        alt: "Landscape photograph DSCF7137",
        filename: "DSCF7137",
    },
    {
        src: "https://live.staticflickr.com/65535/55495187004_91453bb1b6_b.jpg",
        alt: "Landscape photograph DSCF7345",
        filename: "DSCF7345",
    },
    {
        src: "https://live.staticflickr.com/65535/55495012911_071a48561d_b.jpg",
        alt: "Landscape photograph DSCF7670",
        filename: "DSCF7670",
    },
    {
        src: "https://live.staticflickr.com/65535/55495406530_f10585d36a_b.jpg",
        alt: "Landscape photograph DSCF7364",
        filename: "DSCF7364",
    },
    {
        src: "https://live.staticflickr.com/65535/55494036782_8f91514bae_b.jpg",
        alt: "Landscape photograph DSCF7516-2",
        filename: "DSCF7516-2",
    },
];

// The sequence is designed as one coherent editorial block:
// full opener -> wide + tall pair -> supporting wides/standards -> full resets.
const latestLayout = [
    "full",
    "wide",
    "tall",
    "wide",
    "",
    "wide",
    "",
    "wide",
    "full",
    "wide",
    "",
    "full",
];

// script.js defines these arrays before this deferred file executes.
// Mutating them here keeps the existing gallery/lightbox/cursor implementation intact.
photos.unshift(...latestPhotos);
layoutPattern.unshift(...latestLayout);
