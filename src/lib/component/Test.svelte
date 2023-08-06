<script>
    import { bloc } from '$lib/states/bloc';
    import { DecrementEvent, IncrementEvent } from '$lib/states/event';
    import { counterState } from '$lib/states/state';
</script>

<div>{$counterState.status}</div>
<div>{$counterState.value}</div>

<button on:click={() => (bloc.setEvent = new IncrementEvent())}>increment</button>
<button on:click={() => (bloc.setEvent = new DecrementEvent())}>decrement</button>
