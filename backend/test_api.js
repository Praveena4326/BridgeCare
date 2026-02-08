async function testApi() {
    const url = 'http://127.0.0.1:3000/voice/chat';
    const body = {
        elderId: 'elder-001',
        text: 'I miss my daughter today'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log('API RESPONSE:');
        console.log(JSON.stringify(data, null, 2));

        if (data.usedMemories && Array.isArray(data.usedMemories)) {
            console.log('usedMemories count:', data.usedMemories.length);
            if (data.usedMemories.length >= 1) {
                console.log('✅ SUCCESS: usedMemories found!');
            } else {
                console.log('❌ FAILURE: usedMemories is empty.');
            }
        } else {
            console.log('❌ FAILURE: usedMemories is missing or not an array.');
        }
    } catch (error) {
        console.error('❌ ERROR calling API:', error.message);
    }
}

testApi();
