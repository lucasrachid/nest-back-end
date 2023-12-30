import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ModulesModule } from './modules/modules.module';

async function bootstrap() {
    const app = await NestFactory.create(ModulesModule);
    const config = new DocumentBuilder()
        .setTitle('Nest Back TCC - Rachid')
        .setDescription('Documentação Back-End Mangas')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
