import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  //Create ticket
  const ticket = Ticket.build({
    title: 'Concert',
    price: 45,
    userId: '123',
  });
  //Save ticket
  await ticket.save();
  //Fetch ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make 2 separate changes to bots instances
  firstInstance!.set({
    price: 10,
  });

  secondInstance!.set({
    price: 15,
  });
  //save the first instance
  await firstInstance!.save();

  try {
    //save the second instance
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not react this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'Concert',
    price: 45,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
