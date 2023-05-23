import { AuthAndIdleService } from './auth-and-idle.service';

export function authAppInitializerFactory(authAndIdleService: AuthAndIdleService): () => Promise<void> {
    console.log('authAppInitializerFactory')
    return () => authAndIdleService.runInitialLoginSequence();
}
