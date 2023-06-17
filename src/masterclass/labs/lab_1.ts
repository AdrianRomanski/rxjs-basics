
import { loadingService } from './loadingService';

export function lab_1(): void {
    const loadingOverlay = document.getElementById('loading-overlay');

    loadingService.loadingStatus$.subscribe(isLoading => {
        if (isLoading) {
            loadingOverlay.classList.add('open');
        } else {
            loadingOverlay.classList.remove('open')
        }
    });

    setTimeout(() => loadingService.hideLoading(), 3000);
}