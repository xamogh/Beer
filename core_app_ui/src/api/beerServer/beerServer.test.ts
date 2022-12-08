import { getMyBeersApi } from ".";

describe("Beer Server requests suite", () => {
    test("should get all my beers", async () => {
        const response = await getMyBeersApi();
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        try {
            expect(response.data.length).toBeGreaterThan(0);
            expect(response.data[0]).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    genre: expect.any(String),
                    description: expect.any(String),
                    image: expect.any(String),
                })
            );
        } catch (e) {}
    });
});
