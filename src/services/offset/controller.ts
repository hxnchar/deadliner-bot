import * as duration from 'duration-fns';
import { Offset } from 'services/offset/service';

const OffsetController = {

  parse(ISOstring: string) {
    const durationObject = duration.parse(ISOstring);
    const offset = new Offset();

    for (const [key, value] of Object.entries(durationObject)) {
      if (key in offset.target) {
        offset.setValue(key, value);
      }
    }
    return offset;
  },

};

export { OffsetController };
