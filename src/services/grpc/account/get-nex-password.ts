import { Status, ServerError } from 'nice-grpc';
import {GetNEXPasswordRequest,GetNEXPasswordResponse, DeepPartial } from 'pretendo-grpc-ts/dist/account/get_nex_password_rpc';
import { NEXAccount } from '@/models/nex-account';
import { HydratedNEXAccountDocument } from '@/types/mongoose/nex-account';

export async function getNEXPassword(request: GetNEXPasswordRequest): Promise<DeepPartial<GetNEXPasswordResponse>> {
	const nexAccount: HydratedNEXAccountDocument | null = await NEXAccount.findOne({ pid: request.pid });

	if (!nexAccount) {
		throw new ServerError(
			Status.INVALID_ARGUMENT,
			'No NEX account found found',
		);
	}

	return {
		password: nexAccount.password
	};
}