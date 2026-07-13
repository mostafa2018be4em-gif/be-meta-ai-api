const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {

  try {

    const accountId = req.query.account_id;

    if (!accountId) {

      return res.status(400).json({
        success: false,
        message: "Missing account_id"
      });

    }

    const token = process.env.META_ACCESS_TOKEN;

    const fields =
      "campaign_name,spend,impressions,reach,clicks,ctr,cpc,cpm,actions,cost_per_action_type";

    const url =
      `https://graph.facebook.com/v25.0/${accountId}/insights` +
      `?fields=${fields}` +
      `&date_preset=last_30d` +
      `&access_token=${token}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

}