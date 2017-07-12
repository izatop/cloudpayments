import {ClientRequestAbstract} from "./ClientAbstract";
import {ReceiptRecorder} from "./Api/types";
import {ok} from "assert";
import CustomerReceiptItem = ReceiptRecorder.CustomerReceiptItem;

export class ReceiptRecorderApi extends ClientRequestAbstract {
    public getEndpoint() {
        return this.options.endpoint.concat('kkt');
    }

    async createIncomeReceipt(requestId: string, data: ReceiptRecorder.CreateRequest) {
        ok(data.Inn, 'A field Inn is required');
        ok(data.Type, 'A field Type is required');
        ok(!!data.CustomerReceipt, 'A field CustomerReceipt is required');
        ok(!!data.CustomerReceipt.Item && data.CustomerReceipt.Item.length > 0, 'A field CustomerReceipt.Item is required');

        const {CustomerReceipt} = data;

        CustomerReceipt.Item.forEach(item => {
            if (!item.vat) {
                item.vat = this.options.organization.vat;
            }

            ok(!!item.vat, 'A field CustomerReceipt.Item.vat is required');
        });

        if (!CustomerReceipt.taxationSystem) {
            CustomerReceipt.taxationSystem = this.options.organization.taxationSystem;
        }

        ok(!!CustomerReceipt.taxationSystem, 'A field CustomerReceipt.taxationSystem is required');

        return this.call('receipt', data);
    }
}
