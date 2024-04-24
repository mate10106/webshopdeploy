import { mongooseConnect } from "@lib/mongoose";
import { Delivery } from "@models/DeliveryInformation";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { phoneNumber, city, address, postalCode, floor, door, user } =
      req.body;
    const deliveryDoc = await Delivery.create({
      phoneNumber,
      city,
      address,
      postalCode,
      floor,
      door,
      user,
    });
    res.json(deliveryDoc);
  }
}
