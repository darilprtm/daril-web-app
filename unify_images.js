const fs = require('fs');
const path = require('path');

const storiesPath = path.join(__dirname, 'src', 'data', 'stories.json');
const KAABA_IMAGE = "https://images.unsplash.com/photo-1565552643982-2e5f3337dd49?auto=format&fit=crop&q=80&w=800";

try {
    const data = fs.readFileSync(storiesPath, 'utf8');
    let stories = JSON.parse(data);

    stories = stories.map(story => {
        story.coverImage = KAABA_IMAGE;
        story.slides = story.slides.map(slide => {
            slide.image = KAABA_IMAGE;
            return slide;
        });
        return story;
    });

    fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 4));
    console.log("Successfully unified all story images to Kaaba!");
} catch (error) {
    console.error("Error unifying images:", error);
}
