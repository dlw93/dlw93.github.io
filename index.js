import { SectionComponent, TagComponent, TagListComponent } from "./components/index.js";

await Promise.all([
    TagComponent.register(),
    TagListComponent.register(),
]);

// register this one last to ensure nothing gets rendered before (avoids FOUC)
await SectionComponent.register();
