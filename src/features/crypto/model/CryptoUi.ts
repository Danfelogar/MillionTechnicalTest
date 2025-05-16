import {CryptoByIdNet} from './CryptoByIdNet';
import {CryptoNet} from './CryptoNet';

export class CryptoUi {
  constructor(
    public id: string,
    public symbol: string,
    public name: string,
    public nameid: string,
    public rank: number,
    public priceUsd: string,
    public percentChange24h: string,
    public percentChange1h: string,
    public percentChange7d: string,
    public priceBtc: string,
    public market_cap_usd: string,
    public volume24: number,
    public volume24a: number,
    public csupply: string,
    public tsupply: string,
    public msupply: string,
  ) {}

  //input 0.257800 output $0.26
  private static formattedPriceUSD(priceUsd: string): string {
    const price = parseFloat(priceUsd);
    return isNaN(price) ? 'Unable price' : `$${price.toFixed(2)}`;
  }

  //input 0.257800 output $0.000002 BTC
  private static formattedPriceBTC(priceBtc: string): string {
    const price = parseFloat(priceBtc);
    return isNaN(price) ? 'Unable price' : `${price.toFixed(8)} BTC`;
  }

  //input -3.00 or 45.89 output -3.00% or 45.89%
  private static formattedPercentChange(percentChange: string): string {
    const percent = parseFloat(percentChange);
    return isNaN(percent)
      ? 'Unable percent'
      : `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  }

  //transform CryptoNet(domain layer) to CryptoUi(ui layer)
  static fromNetModel(netModel: CryptoNet): CryptoUi {
    return new CryptoUi(
      netModel.id,
      netModel.symbol,
      netModel.name,
      netModel.nameid,
      netModel.rank,
      netModel.price_usd,
      netModel.percent_change_24h,
      netModel.percent_change_1h,
      netModel.percent_change_7d,
      netModel.price_btc,
      netModel.market_cap_usd,
      netModel.volume24,
      netModel.volume24a,
      netModel.csupply,
      netModel.tsupply,
      netModel.msupply,
    );
  }

  //transform CryptoNetById(domain layer) to CryptoUi(ui layer)
  static fromNetModelById(netModel: CryptoByIdNet): CryptoUi {
    return new CryptoUi(
      netModel.id,
      netModel.symbol,
      netModel.name,
      netModel.nameid,
      netModel.rank,
      netModel.price_usd,
      netModel.percent_change_24h,
      netModel.percent_change_1h,
      netModel.percent_change_7d,
      netModel.price_btc,
      netModel.market_cap_usd,
      netModel.volume24,
      netModel.volume24_native, //old volume24a
      netModel.csupply,
      netModel.tsupply,
      netModel.msupply,
    );
  }

  //getters
  get formattedPriceUSD(): string {
    return CryptoUi.formattedPriceUSD(this.priceUsd);
  }

  get formattedPriceBTC(): string {
    return CryptoUi.formattedPriceBTC(this.priceBtc);
  }

  get formattedPercentChange24h(): string {
    return CryptoUi.formattedPercentChange(this.percentChange24h);
  }

  get getIsPercentChange24hIsNegative(): boolean {
    return parseFloat(this.percentChange24h) < 0;
  }

  get formattedPercentChange1h(): string {
    return CryptoUi.formattedPercentChange(this.percentChange1h);
  }

  get formattedPercentChange7d(): string {
    return CryptoUi.formattedPercentChange(this.percentChange7d);
  }

  get formattedMarketCapUSD(): string {
    return CryptoUi.formattedPriceUSD(this.market_cap_usd);
  }

  get formattedVolume24(): string {
    return CryptoUi.formattedPriceUSD(this.volume24?.toString());
  }

  get formattedVolume24a(): string {
    return CryptoUi.formattedPriceUSD(this.volume24a?.toString());
  }
}
