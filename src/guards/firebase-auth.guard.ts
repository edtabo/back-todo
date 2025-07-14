import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { admin } from '../utils/firebase';
import { Localizations } from '../commons/localizations';
import { CommonQuery } from '../commons/queries';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  @Inject(Localizations)
  private readonly localizations: Localizations;

  @Inject(CommonQuery)
  private readonly commonQuery: CommonQuery;

  private excludedRoutes: { path: string; method: string }[] = [
    { path: '/api/auth', method: 'post' },
  ];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const { url, method, headers } = req;

    const cleanUrl = url.split('?')[0];
    const isExcluded = this.excludedRoutes.some(
      (route) =>
        cleanUrl.startsWith(route.path) &&
        method.toLowerCase() === route.method.toLowerCase(),
    );

    const authorization = headers['authorization'];

    if (
      typeof authorization !== 'string' ||
      !authorization.startsWith('Bearer ')
    ) {
      console.log(' 2222222222222 ');
      throw new UnauthorizedException(
        this.localizations.getErrorMessages().unauthorized,
      );
    }

    try {
      const token = authorization.substring(7);

      const user = await admin.auth().verifyIdToken(token, true);

      if (isExcluded) {
        req['user'] = {
          email: user?.email,
          password: user?.uid,
        };
        return true;
      }

      if (!user || !user.email) {
        throw new UnauthorizedException(
          this.localizations.getErrorMessages().unauthorized,
        );
      }

      const userExists = await this.commonQuery.find({
        email: user.email,
        password: user.uid,
      });

      if (!userExists) {
        throw new UnauthorizedException(
          this.localizations.getErrorMessages().unauthorized,
        );
      }

      req['user'] = {
        userId: userExists,
      };
      return true;
    } catch (error: any) {
      console.log(error);
      throw new UnauthorizedException(
        this.localizations.getErrorMessages().unauthorized,
      );
    }
  }
}
