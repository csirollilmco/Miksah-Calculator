<script>
/*
To do:
 * add memory list
 * add more calculators
 * style this thang
 * add history
*/
let entry = '0';
const operators = ['+','-','*','/'];
let operator;
let equated = true;
let current = 0;
function addOp(val) {
	if (splitOp(entry)) {
		equals();
	}
	equated = false;
	operator = val;
	entry += operator;
	current = undefined;
}
function applyOp(val) {
	if (equated) {
		entry = '';
		current = '';
	}
	if (current === undefined) {
		current = '';
	}
	// temp = splitOp(entry.value);
	equated = false;
	current = new Decimal(current + String(val));
	if (entry === '0' || entry === 0) {
		entry = String(val);
	} else {
		entry += String(val);
	}
	return [entry, current];
}
function splitOp(string) {
	let str = String(string).split(new RegExp('('+operators.map((v)=>v = '\\'+v).join('|')+')'));
	if (str[0] === '' && str[1] === '-') {
		str[2] = '-' + str[2];
		str.shift();
		str.shift();
	}
	return str;
}
function special(cur, callback) {
	entry = String(entry).replace(new RegExp(`${current}$`), '');
	current = cur;
	entry += current;
	if (callback) {
		callback();
	}
	return [entry, current];
}
const n0 = () => applyOp(0);
const n1 = () => applyOp(1);
const n2 = () => applyOp(2);
const n3 = () => applyOp(3);
const n4 = () => applyOp(4);
const n5 = () => applyOp(5);
const n6 = () => applyOp(6);
const n7 = () => applyOp(7);
const n8 = () => applyOp(8);
const n9 = () => applyOp(9);
const ce = () => {
	current = 0;
	entry = 0;
	operator = undefined;
	return [entry, current];
};
const c = () => {
	current = 0;
	let temp = splitOp(entry);
	let del = temp.pop();
	temp.push('0');
	entry = temp.join('');
	return [entry, current];
};
const del = () => {
	let temp = splitOp(entry);
	if (operator && !current) {
		operator = undefined;
		temp.pop(); // remove empty string
		temp.pop(); // remove operator
		entry = temp.join('');
		current = entry;
	} else if (operator && current) {
		let last = [...temp.pop()];
		last.pop();
		current = last.join('');
		temp.push(current);
		entry = temp.join('');
	} else if (!operator && current) {
		let temp2 = [...temp[0]];
		temp2.pop();
		current = temp2.join('');
		entry = current;
	}
	return [entry, current, operator];
};
const decimal = () => {
	if (equated) {
		current = '0';
		entry = '0';
	}
	if (current == '') {
		current = '0';
	}
	if (new Decimal(current).isInt() && current.toString().indexOf('.') === -1) {
		current = current.toString() + '.';
		entry += '.';
		equated = false;
	}
	return [entry, current];
};
const minus = () => addOp('-');
const plus = () => addOp('+');
const times = () => addOp('*');
const divide = () => addOp('/');
const equals = () => {
	equated = true;
	let temp = splitOp(entry);
// 	console.log(temp);
	if (temp.length == 2) {
		if (operators.indexOf(temp[0]) != -1) {
			temp.unshift(0);
		} else if (operators.indexOf(temp[1]) != -1) {
			temp.push(0);
		}
	}
	if (temp.length > 1) {
		switch (temp[1]) {
			case '+': current = new Decimal(temp[0]).plus(temp[2]); break;
			case '-': current = new Decimal(temp[0]).minus(temp[2]); break;
			case '*': current = new Decimal(temp[0]).times(temp[2]); break;
			case '/': current = new Decimal(temp[0]).div(temp[2]); break;
		}
		entry = current;
	}
};
const percent = () => special(new Decimal(current).div(100), () => {equated = true});
const sqrt = () => special(new Decimal(current).sqrt(), () => {equated = true});
const square = () => special(new Decimal(current).pow(2), () => {equated = true});
const reciprocal = () => special(new Decimal(1).div(current), () => {equated = true});
const negate = () => special(new Decimal(current).negated());
document.querySelector('body').addEventListener('keydown', (e) => {
	e.preventDefault();
	switch (e.key) {
			case '0': n0(); break;
			case '1': n1(); break;
			case '2': n2(); break;
			case '3': n3(); break;
			case '4': n4(); break;
			case '5': n5(); break;
			case '6': n6(); break;
			case '7': n7(); break;
			case '8': n8(); break;
			case '9': n9(); break;
			case '%': percent(); break;
			case '.': decimal(); break;
			case '/': divide(); break;
			case '*': times(); break;
			case '+': plus(); break;
			case '-': minus(); break;
			case '=': equals(); break;
			case 'Backspace': del(); break;
			case 'Enter': equals(); break;
	}
});
// Memory
let mem = [];
const memMC = () => {
	mem = [];
};
const memMR = () => {
	c();
	current = mem.at(-1);
	entry = entry.slice(0, -1) + mem.at(-1);
};
const memMp = () => {
	mem[mem.length ? mem.length - 1 : 0] = new Decimal(mem[mem.length - 1] || 0).plus(current);
};
const memMm = () => {
	mem[mem.length ? mem.length - 1 : 0] = new Decimal(mem[mem.length - 1] || 0).minus(current);
};
const memMS = () => {
	mem.push(current);
};
const memMl = () => {};
</script>
<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.cdnfonts.com/css/segoe-ui-4" rel="stylesheet">
<link rel="icon" type="image/png" href="data:image/png;base64,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">
</svelte:head>
<div id="app">
	<!-- <img src="https://img.icons8.com/fluency/50/000000/calculator.png"/> -->
	
	<div class="top">
		<button id="menu"><svg viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg></button>
		<input id="entry" placeholder="0" bind:value={entry}>
		<button id="more"><svg viewBox="0 0 24 24"><path d="M12,16A2,2,0,0114,18A2,2,0,0112,20A2,2,0,0110,18A2,2,0,0112,16M12,10A2,2,0,0114,12A2,2,0,0112,14A2,2,0,0110,12A2,2,0,0112,10M12,4A2,2,0,0114,6A2,2,0,0112,8A2,2,0,0110,6A2,2,0,0112,4Z" /></svg></button>
	</div>
	<div class="memGrid">
		<button id="MC" on:click={memMC}>MC</button>
		<button id="MR" on:click={memMR}>MR</button>
		<button id="Mp" on:click={memMp}>M+</button>
		<button id="Mm" on:click={memMm}>M-</button>
		<button id="MS" on:click={memMS}>MS</button>
		<button id="Ml" on:click={memMl}>M<svg viewBox="0 0 10 5"><path d="M0,0L5,5L10,0H0Z" /></svg></button>
	</div>
	<div class="btnGrid">
		<button id="percent" on:click={percent}>%</button>
		<button id="ce" on:click={ce}>CE</button>
		<button id="c" on:click={c}>C</button>
		<button id="del" on:click={del}>←</button>
		<button id="reciprocal" on:click={reciprocal}><sup>1</sup>/<em>x</em></button>
		<button id="square" on:click={square}><em>x</em><sup>2</sup></button>
		<button id="sqrt" on:click={sqrt}><sup>2</sup><svg viewBox="0 0 24 24"><path d="M2,11L4,11L7.37,18L10.37,6L22,6L22,7L11,7L8,19L7,19L3.68,12L2,12Z" /><text x="12" y="18">x</text></svg></button>
		<button id="divide" on:click={divide}>&div;</button>
		<button id="n7" on:click={n7}>7</button>
		<button id="n8" on:click={n8}>8</button>
		<button id="n9" on:click={n9}>9</button>
		<button id="times" on:click={times}>&times;</button>
		<button id="n4" on:click={n4}>4</button>
		<button id="n5" on:click={n5}>5</button>
		<button id="n6" on:click={n6}>6</button>
		<button id="minus" on:click={minus}>&minus;</button>
		<button id="n1" on:click={n1}>1</button>
		<button id="n2" on:click={n2}>2</button>
		<button id="n3" on:click={n3}>3</button>
		<button id="plus" on:click={plus}>&plus;</button>
		<button id="negate" on:click={negate}><svg viewBox="0 0 24 24"><path d="M3,8H6V5H7V8H10V9H7V12H6V9H3V8M14,15H21V16H14V15M16.04,3H17.35L7,21H5.65L16.04,3Z" /></svg></button>
		<button id="n0" on:click={n0}>0</button>
		<button id="decimal" on:click={decimal}>.</button>
		<button id="equals" on:click={equals}>&equals;</button>
	</div>
	<script src="https://unpkg.com/decimal.js"></script>
</div>
<style>
	* {
		box-sizing: border-box;
	}
	:global(html) {
		width: 100vw;
		height: 100vh;
	}
	:global(body) {
		margin: 0px;
		padding: 2px;
		width: calc(100vw - 4px);
		height: calc(100vh - 4px);
		background-image: url("https://unsplash.com/photos/P651qborvwc/download?force=true");
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	input,
	div {
		height: 100%;
	}
	input,
	button {
		all: unset;
		background-color: rgba(255, 255, 255, 0.8);
		-webkit-backdrop-filter: saturate(180%) blur(10px);
		backdrop-filter: saturate(180%) blur(10px);
		cursor: default;
		font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
			"Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		border-radius: 4px;
	}
	em,
	text {
		font-style: italic;
	}
	input {
		text-align: right;
		width: 100%;
		max-width: calc(100vw - 66px);
		border: none;
		padding: 2px;
		margin: 0;
		cursor: text;
	}
	button {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		text-align: center;
		margin: 0;
		padding: 0;
	}
	.top,
	.memGrid,
	.btnGrid {
		display: grid;
		grid-gap: 2px;
		margin: 2px 0;
		padding: 0;
		width: 100%;
		max-width: 100vw;
		border: none;
		height: 100%;
	}
	.top {
		grid-template-rows: 1fr;
		grid-template-columns: 25px auto 25px;
		max-height: 50px;
	}
	.memGrid {
		grid-template-rows: 1fr;
		grid-template-columns: repeat(6, 1fr);
		max-height: 100px;
	}
	.btnGrid {
		grid-template-rows: repeat(6, 1fr);
		grid-template-columns: repeat(4, 1fr);
		font-size: 100%;
	}
	.btnGrid > * {
		min-height: 25px;
	}
	svg {
		width: 24px;
		height: 24px;
		vertical-align: bottom;
	}
	svg > path {
		fill: #000;
	}
	#Ml > svg {
		width: 10px;
		height: 5px;
		display: inline;
		vertical-align: middle;
		margin-left: 1px;
	}
</style>
