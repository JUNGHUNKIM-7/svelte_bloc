<script>
    import { bloc } from '$lib/states/bloc';
    import { DecrementEvent, IncrementEvent } from '$lib/states/event';
    import { counterState } from '$lib/states/state';
</script>

<div>{$counterState.status}</div>
<div>{$counterState.value}</div>

<button on:click={() => (bloc.setCounterEvent = new IncrementEvent())}>increment</button>
<button on:click={() => (bloc.setCounterEvent = new DecrementEvent())}>decrement</button>
