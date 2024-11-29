import { sleep } from "bun"
import { Duration } from "./lib/duration"
import type { IObserver } from "./lib/observer"
import { Simulation } from "./lib/simulation"
import { Asset } from "./models/Asset"
import { AssetStockSimulation } from "./models/AssetStockSimulation"
import { Client } from "./models/Client"
import { Notification } from "./models/notification"
import { PriceHistory, type PriceRecord } from "./services/PriceHistory"
import { NotifyClientOnPriceChange } from "./useCases/NotifyClientOnPriceChange"
import { ConsoleLogger } from "./services/logger/consoleLogger"

const bitcoin = new Asset("BTC", 90000)
Simulation.run(new AssetStockSimulation(bitcoin, 0.001, 0.001), Duration.fromSeconds(1))
const bitcoinPriceHistory = new PriceHistory(bitcoin)
const client = new Client("lucas", "lucas@mail.com", "123456789")
new NotifyClientOnPriceChange(bitcoinPriceHistory, client, 0.01)
client.notificationBox.addObserver(new ConsoleLogger(notification => notification.last?.message ?? ""))
client.notify(new Notification('Welcome to the platform!', new Date()));