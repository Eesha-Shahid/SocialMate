import { Controller, Post, Body, Param, ParseIntPipe, Req, UseGuards, Get } from '@nestjs/common';
import { SocialAuthService } from '../services/social-auth.service';
import { SocialMediaCredentialsDto } from '../dto/social-media-credentials.dto';
import { Roles } from '../roles.decorator';
import { UserType } from '../../common/enums/users.enum';
import { RolesAuthGuard } from '../roles-auth.guard';
import { PlatformDto } from '../dto/platform.dto';

@Controller('social-auth')
@UseGuards(RolesAuthGuard)
export class SocialAuthController {
    authService: any;
    constructor(
        private readonly socialAuthService: SocialAuthService
    ) {}

    @Post('reddit')
    @Roles(UserType.Standard, UserType.Premium)
    async saveRedditAccessToken(
        @Body() SocialMediaCredentialsDto: SocialMediaCredentialsDto,
        @Req() req
    ){
        const socialAccessToken = await this.socialAuthService.connectReddit(SocialMediaCredentialsDto);
        console.log("Reddit: Fetched Access Token")
        return await this.socialAuthService.saveAccessToken(req.user, socialAccessToken);
    }

    @Post('profile')
    @Roles(UserType.Standard, UserType.Premium)
    async fetchProfile(
        @Body() platformDto: PlatformDto,
        @Req() req
    ){
        return await this.socialAuthService.viewSocialProfile(req.user, platformDto);
    }

    @Post('logout')
    @Roles(UserType.Standard, UserType.Premium)
    async deleteAccessToken(
        @Body() platformDto: PlatformDto,
        @Req() req
    ){
        return await this.socialAuthService.deleteAccessToken(req.user, platformDto);
    }
}
