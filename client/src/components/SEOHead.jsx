import { useEffect } from 'react';

const SEOHead = ({ title = "Art-e-Techt Atelier — Where Creative Talent Meets Opportunity", description = "Where Creative Talent Meets Opportunity", image = "https://art-e-techt-95db8.web.app/arte-logo.svg", url = "https://art-e-techt-95db8.web.app/" }) => {
    useEffect(() => {
        // Update basic meta tags
        document.title = title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);

        // Update Open Graph meta tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', title);

        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (!ogDescription) {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute('content', description);

        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', image);

        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', url);

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);
        
        // Viewport meta
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
            document.head.appendChild(viewport);
        }
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
        
    }, [title, description, image, url]);

    return null;
};

export default SEOHead;
