import { getBeersApi } from ".";

describe("Punk Api requests suite", () => {
    test("should get beers", async () => {
        const response = await getBeersApi({ page: 0 });
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0]).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                tagline: expect.any(String),
                first_brewed: expect.any(String),
                description: expect.any(String),
                image_url: expect.any(String),
            })
        );
    });
});
