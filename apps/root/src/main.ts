import { NestFactory } from '@nestjs/core'
import { RootModule } from './root.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(RootModule)

	const config = new DocumentBuilder()
		.setTitle('users example')
		.setDescription('The users API description')
		.setVersion('0.0')
		.addTag('users')
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/swagger', app, swaggerDocument)

	const configService = app.get(ConfigService)

	await app.listen(configService.get('ROOT_PORT'))
}
bootstrap()
