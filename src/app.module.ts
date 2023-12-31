import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [ModulesModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
