const omitMongooseID = (object: any) => {
  const { '_id': mongooseID, ...rest } = object;
  return rest;
};

export { omitMongooseID };
