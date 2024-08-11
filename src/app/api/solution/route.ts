import vm from 'vm'

function testFunction(userFunctionString: any, testCases: any) {
    const results: any = [];

    testCases.forEach((testCase: any) => {
        const { input, expectedOutput } = testCase;
        
        // Cria o código para ser executado, que inclui a definição da função e sua chamada
        const scriptCode = `
            const userFunction = ${userFunctionString};
            userFunction(...input);
        `;

        const context = vm.createContext({ input });

        try {
            // Executa o código dentro do contexto criado
            const script = new vm.Script(scriptCode);
            const result = script.runInContext(context);
            
            // Verifica se o resultado é igual ao esperado
            const passed = JSON.stringify(result) === JSON.stringify(expectedOutput);
            results.push({
                input,
                expectedOutput,
                result,
                passed
            });
        } catch (error: any) {
            results.push({
                input,
                expectedOutput,
                result: null,
                passed: false,
                error: error as any
            });
        }
    });

    return results;
}


const testCases = [
    { input: [1, 2], expectedOutput: 3 },
    { input: [4, 5], expectedOutput: 9 },
    { input: [0, 0], expectedOutput: 0 },
    { input: [-1, -1], expectedOutput: -2 }
];


export async function POST(request: Request) {
    const res = await request.json()
    const code = res.code
    const result = testFunction(code, testCases)
    console.log({result})
    return Response.json({ result })
  }