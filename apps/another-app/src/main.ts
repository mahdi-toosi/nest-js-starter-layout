import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { AnotherAppModule } from './another-app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { RmqService } from '@app/common'
import type { RmqOptions } from '@nestjs/microservices'

async function bootstrap() {
	const app = await NestFactory.create(AnotherAppModule)

	const rmqService = app.get<RmqService>(RmqService)
	app.connectMicroservice<RmqOptions>(rmqService.getOptions('ANOTHER_SERVICE', true))

	app.setGlobalPrefix('api')

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
		})
	)

	app.use(helmet())

	// app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('another app example')
		.setDescription('The another app API description')
		.setVersion('0.0')
		.addTag('another app')
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/swagger', app, swaggerDocument)

	const configService = app.get(ConfigService)

	await app.listen(configService.get('ROOT_PORT'))
}
bootstrap()
