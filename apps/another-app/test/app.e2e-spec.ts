import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AnotherAppModule } from '../src/another-app.module'
import type { TestingModule } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'

describe('anotherAppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AnotherAppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
	})
})
