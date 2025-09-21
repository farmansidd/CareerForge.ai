import asyncio
import asyncpg

async def test_connection():
    conn = await asyncpg.connect(
        "postgresql://neondb_owner:npg_3mufBW1GeXzQ@ep-jolly-thunder-adlyz626-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
    )
    result = await conn.fetch("SELECT version();")
    print(result)
    await conn.close()

asyncio.run(test_connection())
