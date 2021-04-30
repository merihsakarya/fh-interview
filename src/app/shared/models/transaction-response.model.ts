interface TransactionResponseModel {
    fx: FxModel;
    customerInfo: CustomerInfoModel;
    merchant: MerchantModel;
    ipn: IpnModel;
    transaction: TransactionModel;
    acquirer: AcquirerModel;
    refundable: boolean;
}
