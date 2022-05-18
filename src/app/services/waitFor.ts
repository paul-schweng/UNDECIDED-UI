export function waitFor(conditionFunction: any) {

  // @ts-ignore
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout((_: any) => poll(resolve), 10);
  }

  return new Promise(poll);
}
