export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value; // método que o decorator está

        descriptor.value = function (...args: any[]) { // sobreescreve o método com uma nova função
            
            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            console.log(`### BEGIN ${propertyKey} ###`);
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            
            const retorno = metodoOriginal.apply(this, args); // executa o método original
            
            const t2 = performance.now();
            console.log(`o retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`o método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
            console.log(`### END ${propertyKey} ###`);

            return retorno; // devolve o retorno do método original
        }

        return descriptor;
    }
}