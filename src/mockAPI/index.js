import faker from "faker";
export function getMockLists(quantity) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lists = [];
      let count = 0;
      for (let i = 0; i < quantity; i++) {
        const cards = [];
        const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        for (let ic = 0; ic < randomQuantity; ic++) {
          const card = {
            id: count,
            title: faker.name.findName(),
            emails: [faker.internet.email(), faker.internet.email()],
          };
          cards.push({ ...card });
          count = count + 1;
        }
        lists.push({
          id: i,
          name: faker.name.jobTitle(),
          cards,
        });
      }
      resolve(lists);
    }, 1000); // fake delay
  });
}
