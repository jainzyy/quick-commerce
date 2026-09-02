import fs from 'fs';
import path from 'path';
import db from './index';

export async function runSeed() {
  console.log('Seeding database...');
  
  // 1. Run schema.sql
  const schemaPath = path.resolve(process.cwd(), 'src/db/schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  await db.executeMultiple(schemaSql);
  console.log('Schema created/verified.');

  // 2. Check if products already exist
  const result = await db.execute('SELECT COUNT(*) as count FROM products');
  const count = result.rows[0].count as number;
  
  if (count > 0) {
    console.log(`Database already seeded with ${count} products.`);
    return;
  }

  // 3. Load products.json
  const dataPath = path.resolve(process.cwd(), 'src/data/products.json');
  if (!fs.existsSync(dataPath)) {
    console.error('products.json not found! Please ensure it is generated.');
    return;
  }
  
  const productsRaw = fs.readFileSync(dataPath, 'utf8');
  const products = JSON.parse(productsRaw);

  // 4. Insert products
  const insertSql = `
    INSERT INTO products (
      id, name, brand, category, subcategory, price, mrp, discount, weight, unit,
      packageLength, packageWidth, packageHeight, volume, stock, lowStockThreshold,
      rating, reviewCount, image, description, keywords, isFragile, isLiquid,
      isTemperatureSensitive, isHazardous, droneEligible, sustainabilityScore
    ) VALUES (
      :id, :name, :brand, :category, :subcategory, :price, :mrp, :discount, :weight, :unit,
      :packageLength, :packageWidth, :packageHeight, :volume, :stock, :lowStockThreshold,
      :rating, :reviewCount, :image, :description, :keywords, :isFragile, :isLiquid,
      :isTemperatureSensitive, :isHazardous, :droneEligible, :sustainabilityScore
    )
  `;

  // libSQL uses a transaction batch
  const batchArgs = products.map((product: any) => {
    return {
      sql: insertSql,
      args: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        subcategory: product.subcategory,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        weight: product.weight,
        unit: product.unit,
        packageLength: product.packageLength,
        packageWidth: product.packageWidth,
        packageHeight: product.packageHeight,
        volume: product.volume,
        stock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        rating: product.rating,
        reviewCount: product.reviewCount,
        image: product.image,
        description: product.description,
        keywords: JSON.stringify(product.keywords),
        isFragile: product.isFragile ? 1 : 0,
        isLiquid: product.isLiquid ? 1 : 0,
        isTemperatureSensitive: product.isTemperatureSensitive ? 1 : 0,
        isHazardous: product.isHazardous ? 1 : 0,
        droneEligible: product.droneEligible ? 1 : 0,
        sustainabilityScore: product.sustainabilityScore
      }
    };
  });

  await db.batch(batchArgs, 'write');
  console.log(`Successfully seeded ${products.length} products.`);
}

// Run if executed directly
if (require.main === module) {
  runSeed().catch(console.error);
}
