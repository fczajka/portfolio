import {
    AiOutlineArrowUp,
    AiFillPhone,
    AiFillLinkedin,
    AiFillMail,
    AiFillGithub,
} from "react-icons/ai";
import { BiCodeAlt, BiLinkExternal } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import Hero from "@/public/images/hero.png";
import Pizza from "@/public/images/pizza.jpg";
import Creme from "@/public/images/creme.jpg";
import Beef from "@/public/images/beef.jpg";

import foodAndNutrients from "@/public/images/foodandnutrients.gif";
import szczesliwyPuszek from "@/public/images/szczesliwypuszek.gif";

export const header = {
    links: [
        { text: "To the top", href: "#" },
        { text: "My work", href: "#my-work" },
        { text: "About me", href: "#about-me" },
        { text: "Contact me", href: "#contact-me" },
    ],
};

export const menu = {
    buttons: [
        { text: "MENU", aria: "Open menu" },
        { text: "CLOSE", aria: "Close menu" },
    ],
    icons: [
        {
            icon: AiFillMail,
            key: "Mail",
            href: "franekczajkaa@gmail.com",
            type: "mail",
        },
        {
            icon: AiFillGithub,
            key: "Github",
            href: "https://github.com/fczajka",
            type: "link",
        },
        {
            icon: AiFillLinkedin,
            key: "Linkedin",
            href: "https://www.linkedin.com/in/franciszek-czajka/",
            type: "link",
        },
    ],
    links: [
        {
            text: "TOP",
            href: "#",
            desc: "Back to the top.",
        },
        {
            text: "WORK",
            href: "#my-work",
            desc: "Take a look at my work.",
        },
        {
            text: "ABOUT",
            href: "#about-me",
            desc: "A little about me.",
        },
        {
            text: "CONTACT",
            href: "#contact-me",
            desc: "Contact me!",
        },
    ],
};

export const landing = {
    h1: "Hi, my name is Franciszek",
    paragraph: "I am creative web developer from Poznań, Poland.",
    image: Hero,
    letters: ["S", "C", "R", "O", "L", "L"],
};

export const myWork = {
    h2: "Let's work together",
    desc: "My focus on building fast and aesthetically pleasing projects allows me to deliver engaging and compelling user experiences, while also ensuring that my solutions are both functional and efficient.",
    projects: [
        {
            name: "Food and Nutrients",
            shortDesc:
                "Food and Nutrients is a user-friendly web application that provides comprehensive nutrition information for any food and features a convenient meal calculator for tracking nutritional intake.",
            longDesc:
                "The development of this web based application was possible through the integration of the highly reliable Food Data Central API. As an official website of the United States government, the Food Data Central API guarantees that all nutritional information retrieved through this application is of the highest quality and accuracy. In order to create a seamless and user-friendly experience, this project was built using a technologies such as ReactJS, TypeScript, Tailwind, and Redux Toolkit.",
            image: foodAndNutrients,
            links: [
                {
                    text: "Live version",
                    href: "https://foodandnutrients.info/",
                },
                {
                    text: "Code on Github",
                    href: "https://github.com/fczajka/fan-reactjs/",
                },
            ],
        },
        {
            name: "Szczesliwy Puszek",
            shortDesc:
                "Szczesliwy Puszek is a portfolio website that has been specifically designed to showcase the work of newly emerged Samoyed dog breeders.",
            longDesc:
                "The primary objective of this project was to develop a highly functional and aesthetically pleasing website that provides a seamless user experience. To achieve this objective, the website was developed using NextJS in combination with technologies such as Tailwind, EmailJS, and React Toastify. This platform offers the owners a powerful and versatile tool for showcasing their dogs and services.",
            image: szczesliwyPuszek,
            links: [
                {
                    text: "Live version",
                    href: "https://www.szczesliwy-puszek.pl/",
                },
                {
                    text: "Code on Github",
                    href: "https://github.com/fczajka/szczesliwy-puszek-nextjs/",
                },
            ],
        },
        {
            name: "Lorem Ipsum",
            shortDesc:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem maxime molestiae sunt possimus iusto. Quibusdam dolorum, tempora cumque vero inventore odio non ex amet temporibus fuga expedita. Minima, quas sunt.",
            longDesc:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem maxime molestiae sunt possimus iusto. Quibusdam dolorum, tempora cumque vero inventore odio non ex amet temporibus fuga expedita. Minima, quas sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem maxime molestiae sunt possimus iusto. Quibusdam dolorum, tempora cumque vero inventore odio non ex amet temporibus fuga expedita. Minima, quas sunt.",
            image: Pizza,
            links: [
                { text: "Live version", href: "https://github.com/" },
                { text: "Code on Github", href: "https://github.com/" },
            ],
        },
    ],
};

export const aboutMe = {
    h2: "Get to know me!",
    firstParagraph:
        "I'm a developer, maker and problem solver. When I'm not crafting code, I find joy in playing football or experimenting with new recipes and techniques in the kitchen.",
    h3: "Cooking",
    secondParagraph:
        "From savory meals to sweet treats, my culinary interests are broad, though I tend to lean torward recipes that feature sugar or chocolate.",
    foods: [
        { name: "Pizza", image: Pizza, alt: "Pizza" },
        { name: "Crème Caramel", image: Creme, alt: "Crème Caramel" },
        { name: "Beef", image: Beef, alt: "Beef" },
    ],
};

export const contact = {
    h3: "Write to me!",
    form: [
        { label: "Name:", htmlFor: "name", type: "text" },
        { label: "E - mali:", htmlFor: "email", type: "text" },
        { label: "Message:", htmlFor: "message", type: null },
    ],
    button: { text: "Send message!" },
    links: [
        {
            text: "franekczajkaa@gmail.com",
            href: "franekczajkaa@gmail.com",
            icon: AiFillMail,
            type: "mail",
        },
        {
            text: "https://github.com/fczajka",
            href: "https://github.com/fczajka",
            icon: AiFillGithub,
            type: "link",
        },
        {
            text: "https://www.linkedin.com/in/franciszek-czajka/",
            href: "https://www.linkedin.com/in/franciszek-czajka/",
            icon: AiFillLinkedin,
            type: "link",
        },
    ],
};

export const mobileNavbar = {
    links: [
        { text: "To the top", href: "#", icon: AiOutlineArrowUp, type: "link" },
        { text: "My work", href: "#my-work", icon: BiCodeAlt, type: "link" },
        {
            text: "About me",
            href: "#about-me",
            icon: BsFillPersonFill,
            type: "link",
        },
        {
            text: "Contact me",
            href: "#contact-me",
            icon: AiFillPhone,
            type: "link",
        },
    ],
    buttons: [
        {
            text: "Menu",
            aria: "Open menu",
        },
        {
            text: "Close",
            aria: "Close menu",
        },
    ],
};
