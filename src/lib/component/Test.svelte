<script>
    import bloc from '$lib/blocs/bloc';
    import { DecrementEvent, IncrementEvent } from '$lib/blocs/counter/event';
    import { counterState } from '$lib/blocs/counter/state';
</script>

<div>{$counterState.status}</div>
<div>{$counterState.value}</div>

<button on:click={() => (bloc.setCounterEvent = new IncrementEvent())}>increment</button>
<button on:click={() => (bloc.setCounterEvent = new DecrementEvent())}>decrement</button>
