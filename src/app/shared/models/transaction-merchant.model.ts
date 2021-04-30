interface TransactionMerchantModel {
    referenceNo: string;
    merchantId: number;
    status: string;
    channel: string;
    customData: string;
    chainId: string;
    agentInfoId: number;
    operation: string;
    fxTransactionId: number;
    updated_at: string;
    created_at: string;
    id: number;
    acquirerTransactionId: number;
    code: string;
    message: string;
    transactionId: string;
    agent: AgentModel;
}
