/**
 * Clase para almacenar las rutas a los endpoints del back
 */
export class AppApiConstants {

    public static API_BASE_ENDPOINT = '/api';

    public static LOGIN = '/authenticate';
    public static ALL_CAMPAIGNS = '/private/campaigns';
    public static REGISTER = '/users';
    public static UPDATE_USER = '/private/users';

    public static USER_WALLET(idUser: string): string {
        return `/private/users/${idUser}/wallet`;
    }
    public static CONTRIBUTE_CAMPAIGN(walletId: string, campaignId: string): string {
        return `/private/wallets/${walletId}/${campaignId}`;
    }

    public static WALLET_HISTORIC(walletId: string): string {
        return `/private/wallets/${walletId}/balance`;
    }

    public static REDEEM_COUPON(walletId: string, couponId: string) {
        return `/private/coupons/${couponId}/${walletId}`;
    }

    public static CONTRIBUTION_HISTORIC(walletId: string): string {
        return `/private/wallets/${walletId}/contributiondetail`;
    }

    public static CONTRIBUTION_SUMMARY(walletId: string): string {
        return `/private/wallets/${walletId}/contributionsummary`;
    }

    public static CAMPAIGN_BY_ID(campaignId: string): string {
        return `/private/campaigns/${campaignId}`;
    }

    public static BLOCK_INFO(txId: string): string {
        return `/private/blocks/${txId}`;
    }
}
