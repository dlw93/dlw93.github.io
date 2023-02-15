import { BibliographyComponent, ReferenceComponent, SectionComponent, TagComponent, TagListComponent } from "./components/index.js";

await Promise.all([
    TagComponent.register(),
    TagListComponent.register(),
    BibliographyComponent.register(),
    ReferenceComponent.register(),
]);

// register this one last to ensure nothing gets rendered before (avoids FOUC)
await SectionComponent.register();

// some goodies for those who want to play around in the console
globalThis.cv = {
    tags(limit) {
        const tags = [...TagComponent.tags]
            .map(([tag, count]) => ({ Tag: tag, Count: count }))
            .sort((a, b) => b.Count - a.Count)
            .slice(0, limit);

        console.table(tags);
    },
};
