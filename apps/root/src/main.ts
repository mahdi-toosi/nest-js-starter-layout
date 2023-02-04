import { NestFactory } from '@nestjs/core'
import { RootModule } from './root.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(RootModule)

	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/swagger', app, document)

	await app.listen(3000)
}
bootstrap()
