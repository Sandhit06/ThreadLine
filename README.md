# Threadline — Fashion Commerce Frontend

A portfolio frontend prototype inspired by modern fashion-commerce and quick-commerce interfaces. This is an independent demo, not an official Slikk project. Product details and prices are local mock data; no real checkout or production API is connected.

## Tech stack
- Next.js App Router
- React and TypeScript
- Tailwind CSS v4 plus a small layer of custom CSS for the visual system
- React state for search, category filtering, sorting, favourites, sizes, and cart quantities

## Features
- Responsive consumer storefront for mobile, tablet, and desktop
- Search across product name, category, and colour
- Category filters and price/newness sorting
- Reusable product cards with size selection and favourite toggles
- Slide-in shopping bag with quantity controls and subtotal calculation
- Empty states, accessible labels, responsive navigation, and reduced-motion support

## Run locally
Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To create a production build:

```bash
npm run build
npm start
```

## Project notes
- Product photos load from Unsplash image URLs and require an internet connection.
- Checkout is disabled deliberately; this is a frontend portfolio prototype and does not process payments.
- Product catalog is defined in `lib/products.ts` so it can later be replaced by a REST API.

## Developer
<table>
    <tr align="center">
        <td>
        Sandhit Karmakar
        <p align="center">
            <img src = "https://avatars.githubusercontent.com/u/90787826?v=4" width="150" height="150" alt="Dhruv Shah">
        </p>
            <p align="center">
                <a href="https://github.com/Sandhit06">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793130084/round-collaboration-social-github-code-circle-network-icon_rk5x5t.svg" width="36" height="36" alt="GitHub"/>
                </a>
                <a href="https://www.linkedin.com/in/sandhit-karmakar/" target="_blank">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793130084/network-linkedin-social-connection-circular-circle-media-icon_vdou3m.svg" width="36" height="36" alt="LinkedIn"/>
                </a>
                <a href="mailto:sandhitkarmakar@gmail.com" target="_blank">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793129062/share-send-email-chat-circle-message-mail-icon_u4rx53.svg" width="36" height="36" alt="Email"/>
                </a>
            </p>
        </td>
    </tr>
</table>

<p align="center">
    Made with ❤️ by <a href="https://github.com/Sandhit06">Sandhit Karmakar</a>
</p>
