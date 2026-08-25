import { delay, http, HttpResponse } from 'msw';
import type { LoginRequest, PageResponse } from '@/api/contracts';
import { env } from '@/lib/env';
import { createMockSession, mockCredentials } from './fixtures/auth';
import { mockAppointments } from './fixtures/appointments';
import { mockCalls } from './fixtures/calls';
import { mockFacilities } from './fixtures/facilities';
import { mockLogs } from './fixtures/logs';
import { mockSystemStatus } from './fixtures/system';
const api = env.apiBaseUrl;

function page<T>(items: T[], number: number, size: number): PageResponse<T> { const content = items.slice(number * size, number * size + size); const totalPages = Math.ceil(items.length / size); return { content, number, size, totalElements: items.length, totalPages, first: number === 0, last: number >= totalPages - 1, empty: content.length === 0 }; }

export const authHandlers = [
  http.post(`${api}/auth/login`, async ({ request }) => { await delay(350); const body = await request.json() as LoginRequest; return body.email === mockCredentials.email && body.password === mockCredentials.password ? HttpResponse.json(createMockSession()) : HttpResponse.json({ message: 'E-posta veya şifre hatalı.', status: 401, correlationId: 'mock-auth-error' }, { status: 401 }); }),
];

export const dataHandlers = [
  http.get(`${api}/stores`, async () => { await delay(120); return HttpResponse.json(mockFacilities); }),
  http.get(`${api}/calls`, async ({ request }) => { await delay(220); const url = new URL(request.url); const storeId = url.searchParams.get('storeId'); const q = url.searchParams.get('q')?.toLocaleLowerCase('tr-TR'); return HttpResponse.json(mockCalls.filter((item) => (!storeId || item.storeId === storeId) && (!q || item.roomName.toLocaleLowerCase('tr-TR').includes(q) || item.customerPhone.includes(q)))); }),
  http.get(`${api}/calls/:id`, async ({ params }) => { await delay(120); const item = mockCalls.find((call) => call.id === params.id); return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Çağrı bulunamadı.' }, { status: 404 }); }),
  http.get(`${api}/appointments`, async ({ request }) => { await delay(240); const url = new URL(request.url); const storeId = url.searchParams.get('storeId'); const status = url.searchParams.get('status'); const from = url.searchParams.get('from'); const to = url.searchParams.get('to'); const number = Number(url.searchParams.get('page') ?? 0); const size = Number(url.searchParams.get('size') ?? 20); const items = mockAppointments.filter((item) => (!storeId || item.storeId === storeId) && (!status || item.status === status) && (!from || new Date(item.startTime) >= new Date(from)) && (!to || new Date(item.startTime) <= new Date(to))); return HttpResponse.json(page(items, number, size)); }),
  http.get(`${api}/appointments/:id`, async ({ params }) => { await delay(100); const item = mockAppointments.find((appointment) => appointment.id === params.id); return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Randevu bulunamadı.' }, { status: 404 }); }),
  http.get(`${api}/system/status`, async () => { await delay(100); return HttpResponse.json(mockSystemStatus); }),
  http.get(`${api}/logs`, async ({ request }) => { await delay(180); const url = new URL(request.url); const service = url.searchParams.get('service'); const level = url.searchParams.get('level'); const correlationId = url.searchParams.get('correlationId'); const number = Number(url.searchParams.get('page') ?? 0); const size = Number(url.searchParams.get('size') ?? 20); const items = mockLogs.filter((item) => (!service || item.service === service) && (!level || item.level === level) && (!correlationId || item.correlationId.includes(correlationId))); return HttpResponse.json(page(items, number, size)); }),
];

export const handlers = [...authHandlers, ...dataHandlers];
