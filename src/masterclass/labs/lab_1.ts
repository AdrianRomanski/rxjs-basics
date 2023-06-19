
import { loadingService } from './loadingService';

export function lab_1(): void {
    const loadingOverlay = document.getElementById('loading-overlay');

    loadingService.loadingStatus$.subscribe(isLoading => {
        if (isLoading) {
            // @ts-ignore
            loadingOverlay.classList.add('open');
        } else {
            // @ts-ignore
            loadingOverlay.classList.remove('open')
        }
    });

    setTimeout(() => loadingService.hideLoading(), 3000);
}