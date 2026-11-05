# Using relationship data in a BI tool

`data/relationship-data.csv` is an ordinary CSV file, so any BI tool can read it. It is the same file that feeds the diagram, so a report and the model show the same values (ADR 0005).

**These steps have not been tested.** They come from Microsoft's documentation and need trying in Power BI before you rely on them.

## What is in the file

There is one row per relationship. `source`, `kind` and `target` identify the relationship, using the identifiers from the `.c4` files.

| Column | Holds | Example |
|---|---|---|
| `source`, `kind`, `target` | Which relationship | `foodDeliveryPlatforms`, `pays`, `paymentCompanies` |
| `transactionVolume` | A plain number | `4000000` |
| `transactionUnit` | What is being counted | `payments` |
| `transactionPeriod` | Per what period; can be blank | `week` |
| `feePercentage` | A plain number | `1.5` |
| `feeAmountGbp`, `feeUnit` | A plain number, and what it is charged per | `2`, `per check` |
| `averageValueGbp` | A plain number | `25` |
| `shareOfOrdersPercentage` | A plain number | `40` |
| `frequency` | How often it happens | `weekly` |
| `dataSource` | Where the values came from | `Invented` |

## Bringing it into Power BI Desktop

1. Choose **Get data**, then **Text/CSV**, and select `data/relationship-data.csv`.
2. Choose **Transform data** and check that the number columns came through as numbers.
3. Choose **Close & Apply**.
4. After the CSV changes, choose **Refresh** to see the new values.

The same file also opens in Excel's Power Query and in Tableau as a text file.

## Things to watch

- **Don't add up volumes across units.** Orders, payments, checks and businesses rated all sit in `transactionVolume`, so filter or group by `transactionUnit` first. Units such as `orders per site` are per site or per restaurant, so they can't be added to totals either.
- **Names are identifiers.** `source` and `target` hold values like `deliveryPlatformSystem.restaurantPortal.orders`. You may want to tidy these in Power Query for display.
- **Every value is invented.** The `dataSource` column says so.

## Refreshing automatically

The file sits in a local git folder, which limits what the Power BI service can do with it.

| Where the CSV is | How it refreshes |
|---|---|
| On your PC, used from Power BI Desktop | Choose **Refresh** by hand |
| On your PC, published to the Power BI service | Needs an on-premises data gateway |
| On OneDrive or SharePoint | Use the **Web** connector with the file's online address rather than Text/CSV, which otherwise keeps a local reference and needs a gateway. Microsoft says changes then sync about every hour |

Microsoft also says you can't schedule a refresh on a semantic model created directly from a CSV file, and its page on this is dated, so check how it behaves in your tenant.

Keeping the CSV on OneDrive or SharePoint would also move it out of this repository, or need a copy that could fall out of step. That choice is still open.

Sources: [Refresh a semantic model created from a .csv file on OneDrive](https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-csv-file-onedrive), [gateway needed for local files](https://community.fabric.microsoft.com/t5/Desktop/Data-Refresh/m-p/3554482).
