import { Controller, Post, Body, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { SocialAuthService } from '../services/social-auth.service';
import { SocialMediaCredentialsDto } from '../dto/social-media-credentials.dto';
import { Roles } from '../roles.decorator';
import { UserType } from '../../common/enums/users.enum';
import { RolesAuthGuard } from '../roles-auth.guard';

@Controller('social-auth')
@UseGuards(RolesAuthGuard)
export class SocialAuthController {
    constructor(
        private readonly socialAuthService: SocialAuthService
    ) {}

    @Post('twitter')
    @Roles(UserType.Standard, UserType.Premium)
    async saveTwitterAccessToken(
        @Body() SocialMediaCredentialsDto: SocialMediaCredentialsDto,
        @Req() req
    ){
        const socialAccessToken = await this.socialAuthService.connectTwitter(SocialMediaCredentialsDto);
        await this.socialAuthService.saveAccessToken(req.user, socialAccessToken);
        return { message: "Twitter Access Token Saved" };
    }

    @Post('reddit')
    @Roles(UserType.Standard, UserType.Premium)
    async saveRedditAccessToken(
        @Body() SocialMediaCredentialsDto: SocialMediaCredentialsDto,
        @Req() req
    ){
        const socialAccessToken = await this.socialAuthService.connectReddit(SocialMediaCredentialsDto);
        await this.socialAuthService.saveAccessToken(req.user, socialAccessToken);
        return { message: "Redit Access Token Saved" };
    }
}
