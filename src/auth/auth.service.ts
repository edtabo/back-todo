import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterQuery } from './queries';
import { Localizations } from '../commons/localizations';
import { IResponse } from '../commons/interfaces';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  @Inject(RegisterQuery)
  private readonly registerQuery: RegisterQuery;

  @Inject(Localizations)
  private readonly localizations: Localizations;

  async create(createAuthDto: CreateAuthDto, req: Request): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    try {
      const { email, password } = req['user'];
      const { fullName } = createAuthDto;
      let next = true;

      const user = await this.registerQuery.find({ email });
      if (user) {
        message = this.localizations.getErrorMessages().userAlreadyExists;
        next = false;
      }

      if (next) {
        const query = await this.registerQuery.create({
          email,
          password,
          fullName,
        });

        if (query) {
          message = this.localizations.getSuccessMessages().requestSuccess;
        }
      }

      return {
        success: next,
        message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
