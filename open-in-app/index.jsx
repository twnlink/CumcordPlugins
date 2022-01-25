import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';
import { before } from '@cumcord/patcher';
import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import services from './services.json';

const patches = [];
const SwitchItem = findByDisplayName('SwitchItem');

export default {
   onLoad() {
      const Anchor = findByDisplayName('Anchor', false);
      patches.push(before('default', Anchor, (args) => {
         const link = args[0]?.href?.toLowerCase();

         if (link) {
            for (const service of services) {
               if ((persist.ghost[service.name] ?? true) && service.links.some(l => ~link.indexOf(l))) {
                  if (!link.includes(service.identifier)) args[0].href = `${service.identifier}${args[0].href}`;
               }
            }
         }

         return args;
      }));

      const Copy = findByProps('asyncify', 'copy');
      patches.push(before('copy', Copy, ([link]) => {
         for (const service of services) {
            if ((persist.ghost[service.name] ?? true) && service.links.some(l => ~link.indexOf(l))) {
               link = link.replace(service.identifier, '');
            }
         }

         return [link];
      }));
   },

   onUnload() {
      for (const unpatch of patches) unpatch();
   },

   settings() {
      useNest(persist);

      return services.map(service =>
         <SwitchItem
            value={persist.ghost[service.name] ?? true}
            onChange={() => persist.store[service.name] = !persist.store[service.name]}
         >
            {service.name}
         </SwitchItem>
      );
   }
};