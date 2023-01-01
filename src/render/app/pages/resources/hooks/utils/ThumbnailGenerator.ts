import { IResource } from '../../../../../../shared/IResource';

export type IProcessor = (projectId: string, resource: IResource) => Promise<IResource>;

export type IInputThumbnailGenerator = {
    projectId: string;
    resources: IResource[];
    processor: IProcessor;
    abortSignal: () => boolean;
    numberOfJobs: number;
};

export class ThumbnailGenerator {
    private projectId: string;
    private pendingResources: IResource[];
    private numberOfJobs = 3;
    private inProgress = 0;
    private processor: IProcessor;
    private abortSignal: () => boolean;

    private onFinishPromiseResolve: (value: unknown) => void;
    private onResourceReadyCallback: (resource: IResource) => void;

    constructor({ projectId, resources, processor, abortSignal, numberOfJobs }: IInputThumbnailGenerator) {
        this.projectId = projectId;
        this.pendingResources = resources.slice();
        this.processor = processor;
        this.abortSignal = abortSignal;
        this.numberOfJobs = numberOfJobs;
    }

    async calculateResources(): Promise<void> {
        setTimeout(() => this.processNextResource(), 0);

        return new Promise((resolve) => {
            this.onFinishPromiseResolve = resolve;
        })
    }

    onResourceReady(onResourceReadyCallback: (resource: IResource) => void): void {
        this.onResourceReadyCallback = onResourceReadyCallback;
    }

    private processNextResource() {
        console.log(`[ThumbnailGenerator.processNextResource]`);
        if (this.inProgress < this.numberOfJobs && this.pendingResources.length) {
            this.processResource(this.pendingResources.shift());
            this.processNextResource();
        }
    }

    private async processResource(resource: IResource) {
        this.inProgress++;
        console.log(`[ThumbnailGenerator.processResource] start ${resource.id}`);
        if (this.checkIsAborted()) {
            return;
        }
        const updatedResource = await this.processor(this.projectId, resource);

        if (this.checkIsAborted()) {
            return;
        }

        if (updatedResource) {
            this.onResourceReadyCallback(updatedResource);
        }

        this.inProgress--;

        console.log(`[ThumbnailGenerator.processResource] finished ${resource.id}`);

        if (this.pendingResources.length === 0 && this.inProgress === 0) {
            this.onFinishPromiseResolve(true);
        } else {
            this.processNextResource();
        }
    }

    private checkIsAborted() {
        if (this.abortSignal()) {
            console.log(`[ThumbnailGenerator.checkIsAborted] aborted`);
            this.onFinishPromiseResolve(true);
            return true;
        }
        return false;
    }

}
